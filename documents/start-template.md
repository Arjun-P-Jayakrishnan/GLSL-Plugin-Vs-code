###	Training You To Write it

Lets start with one an only thing all programming languages need ! comments.

For e.g. in `glsl` comments are single line comments such as `\\ comment` and multi line comments such as `\* whatever you want to write *\` .
so in order to look for that we first look for multiline comment `\*  *\`

```
"$schema": "<somlink as given by yo generator>",
"name": "GLSL",
"patterns": [
	{
	"include": "#comments"
	}
],
"repository": {
	"comments":{
		"patterns":[
			{
				"captures": {
					"0":{
					"name":"punctuation.definition.comment.glsl"
					}
					},
				"match": "/\\*\\*/",
				"name":"comment.block.empty.glsl"
			}
		]
	},
},
"scopeName": "source.glsl"
```