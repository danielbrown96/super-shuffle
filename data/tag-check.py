import json

with open('data/heroes-schema.json', 'r') as schema_file:
    schema = json.load(schema_file)

with open('data/heroes.json', 'r') as data_file:
    data = json.load(data_file)


# General function to find new tags for a given tag type
def find_new_tags(data, schema, tag_type, is_enum=True):
    new_tags = set()

    # Navigate to the 'properties' under 'items'
    if 'items' in schema and 'properties' in schema['items']:
        schema_properties = schema['items']['properties']
    else:
        print(f"'properties' not found in the schema for {tag_type}")
        return new_tags

    # Check if the tag type is defined in the schema
    if tag_type in schema_properties:
        if is_enum:
            schema_tags = set(schema_properties[tag_type]['items'].get('enum', []))
        else:
            schema_tags = set(schema_properties[tag_type]['items'].get('properties', {}).keys())

        for hero in data:
            if tag_type in hero:
                if isinstance(hero[tag_type], list):  # Check if the tag type is a list
                    for tag in hero[tag_type]:
                        if isinstance(tag, dict):  # For mechanical-tags or synergy-tags
                            for key in tag.keys():
                                if key not in schema_tags:
                                    new_tags.add(key)
                        elif tag not in schema_tags:  # For thematic-tags or ability-tags
                            new_tags.add(tag)

    return new_tags


# Tag types to check (enum for thematic and ability, dictionary for mechanical and synergy)
tag_types = {
    "mechanical-tags": False,
    "synergy-tags": False,
    "thematic-tags": True,
    "ability-tags": True
}

# Update schema with any new tags found
schema_updated = False
for tag_type, is_enum in tag_types.items():
    new_tags = find_new_tags(data, schema, tag_type, is_enum)

    if new_tags:
        if is_enum:
            schema['items']['properties'][tag_type]['items']['enum'].extend(new_tags)
        else:
            for tag in new_tags:
                schema['items']['properties'][tag_type]['items']['properties'][tag] = {"type": "integer"}

        schema_updated = True
        print(f"Schema updated with new {tag_type}: {new_tags}")

if schema_updated:
    # Write the updated schema back to the file
    with open('data/heroes-schema.json', 'w') as schema_file:
        json.dump(schema, schema_file, indent=4)
else:
    print("No new tags found for any tag types.")