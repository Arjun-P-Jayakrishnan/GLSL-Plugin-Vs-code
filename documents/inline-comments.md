## Inline Comment

Two main types of comment /** */ and // are the types we are focusing on.

We start with code 

```
	"comments-inline":{
	"patterns": [
			
		]
	},
```


### /** */ comments
 
 For this comment we add the following code
```
	{
		"begin": "/\\*",
		"captures": {
		"0":{
		"name":"punctuation.defenition.comment.glsl"
		}},
		"end": "\\*/",
		"name":"comment.block.glsl"
	}
```
This means starting with 
**begin** -> recognizes /* and starts block of code 
**end** -> recognizes */ and ends the block of code
>i guess capture treats everything inside it as a single unit and hence 
```
	"captures": {
		"0":{
		"name":"punctuation.defenition.comment.glsl"
	}},
```
**name** assigns the block the name comment block

### //

For this comment 
```
{
	"begin": "(^[ \\t]+)?(?=//)",
	"beginCaptures": {
		"1":{
		"name":"punctuation.whitespace.comment.leading.glsl"
		}
		},
		"end":"(?!\\G)",
		"patterns": [
			{
			"begin":"//",
			"beginCaptures": {
			"0":{
				"name":"punctuation.definition.comment.glsl"
			}
			},
			"end": "\\n",
			"name":"comment.line.double-slash.glsl"
			}
		]
}
```

`(^[ \\t]+)?(?=//)` means `^` start of line `[ \\t]+` all spaces or tabs 
`(^[ \\t]+)?` means if it exists ignore
`(?=//)` i need to show this reference 

(https://stackoverflow.com/questions/2973436/regex-lookahead-lookbehind-and-atomic-groups)

means that look ahead at the first `A(?=B)` i.e. `expression where spaces or tabs is followed by //`
so altogether ignore any spaces or tabs and start at the first  `//`   

> **begin captures** no idea

**end** end it after the last `\\` after which no more `\\` comes again in the sequence `` \G means matching start position ``

so basically it just means that begin with sequences having 0 or more spaces or tabs, followed by `//`  and end after the starting position i.e. 
> i guess stop after the first `//`

we tell vs code to consider them as whitespaces or tabs


now we narrow down the  first `//` and then we check for pattern starting with `//` until we encounter `\\n` i.e. new line 

we style it with `"name":"comment.line.doub