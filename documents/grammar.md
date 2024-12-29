### Text Mate Grammar

- **name** - `"name": "keyword.control.glsl"` which is used to show syntax styling and scope-specific-setting and actions (idk) which means it should be derived from one of the standard names.
- **match** - `"match": "\\b(if|while|for|return)\\b"` is used for identifying a portion of text to which the name is specified. **Note** match is only used for single line use case.
- **begin , end** -

```
	 "name": "string.quoted.double.glsl",
        "begin": "\"",
        "end": "\"",
        "patterns": [{
        	"name": "constant.character.escape.glsl",
        	"match": "\\\\."
        	}]
```

As shown above it does not have any match statement along with it but inside the patterns.**begin , end** is mainly used for multiline code selection e.g. think of curly braces, multiline comments etc.
