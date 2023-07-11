import os
import json

# Get the list of files in the current directory
files = os.listdir()

# Filter out directories and subdirectories
files = [file for file in files if os.path.isfile(file)]

# Create a dictionary to store the file names
file_dict = {"files": files}

# Save the file names to a JSON file
with open("files.json", "w") as json_file:
    json.dump(file_dict, json_file)
