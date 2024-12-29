
# GLSL Plugin For VS Code

Vs-code extension for GL Shader Language (.glsl) syntax highlighting.

## Features

Extension is designed to provide syntax highlights to your glsl code with the extensions ".glsl" ,".vert", and ".frag".

> Tip: I have actually given steps for doing it so that someone does this for others to look at. Thanks for the people on internet for data even though its hard to find any references.

## Requirements

GLSL syntax highlights are meant for `.glsl` or `.vert` or `.frag` files and hence advised to name them as such.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Journey

### Yeoman
 - Install `yeoman` generator using this command
  `pnpm install -g yo generator-code` 
 >it is the recommended way but i had my issue with this due to permission which i solved by `Run as administrator` and `removing -g` (only do this if the previous command doesn't work !!!)
 - Run `yo code` which will pop open a window asking you to select a section
 > if this also has permission issue or is not running only way is take the path and replace yo with it, i.e. `yo code` to `<path\to\yo> code`.
 -  If for syntax purposes or custom language support select 
 `New Language Support`.
 - It will ask for details fill them out. 
 >Template i will add in sometime
 - Hurray!!! you got yourself a new extension setup.(a folder with the name of extension or detail that you gave will be created in the current working directory)
 - Navigate into the folder.
 
 ### .tmLanguage

Now that that's done we can see a folder with syntaxes folder and some other files.
   


## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---
## References

 - https://macromates.com/manual/en/language_grammars
 - https://stackoverflow.com/questions/30687783/create-custom-language-in-visual-studio-code


**Enjoy!**
