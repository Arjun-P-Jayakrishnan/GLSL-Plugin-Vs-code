## /* */ comments
we add 
```
	{
	"include": "#comments"
	}
```
to let vs code look for comments and highlight
Now we can let it know how to recognize one by the following grammar

```
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

```