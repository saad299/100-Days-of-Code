import json

data = {"name": "Alice", "age": 30}

# Dict → JSON string (serialize)
json_str = json.dumps(data)

# JSON string → Dict (deserialize)
parsed = json.loads(json_str)

# Save to file / load from file
with open("data.json", "w") as f:
    json.dump(data, f)

with open("data.json", "r") as f:
    loaded = json.load(f)