# GLSL ShaderLab

[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)]()
[![VSCode](https://img.shields.io/badge/VSCode-1.101.0+-blue.svg)]()
[![Category](https://img.shields.io/badge/category-Programming%20Languages-orange.svg)]()

---

**GLSL ShaderLab** is a VSCode extension for developing, editing, and previewing GLSL shaders with full language support and live WebGL rendering.

---

## ✨ Features

- ✅ Syntax highlighting for:
  - `.glsl` (generic GLSL)
  - `.vert` (vertex shaders)
  - `.frag` (fragment shaders)
- ✅ Stage-specific grammars:
  - Vertex and Fragment builtins highlighted separately
  - Accurate scopes for control flow and loop keywords
- ✅ Comment and string highlighting
- ✅ Escape sequences inside strings
- ✅ Live WebGL preview (initial implementation)
- ✅ Clean, scalable multi-language architecture

---

## 🚀 Getting Started

1. Clone or install the extension.
2. Open your shader files:
   - `*.glsl` → generic GLSL
   - `*.vert` → vertex shader
   - `*.frag` → fragment shader
3. Press `F5` in VSCode to launch Extension Development Host for testing.

---

## 📂 Language Support

| Extension | Shader Type     |
| --------- | --------------- |
| `.glsl`   | Generic GLSL    |
| `.vert`   | Vertex shader   |
| `.frag`   | Fragment shader |

---

## 🎨 Syntax Highlighting

- Control Flow Keywords:
  - `if`, `else`, `return`, `break`, `continue`, `discard`
- Loop Keywords:
  - `for`, `while`, `do`
- Strings with escape sequences (`\"`, `\\`, etc.)
- Single-line (`//`) and multi-line (`/* ... */`) comments
- Built-in Variables:
  - Vertex: `gl_Position`, `gl_VertexID`, `gl_InstanceID`
  - Fragment: `gl_FragColor`, `gl_FragCoord`, `gl_FrontFacing`

---

## 🔬 Scopes Used

| Scope                             | Description              |
| --------------------------------- | ------------------------ |
| `keyword.control.flow.glsl`       | Flow control             |
| `keyword.control.loop.glsl`       | Looping keywords         |
| `string.quoted.double.glsl`       | Double quoted strings    |
| `constant.character.escape.glsl`  | Escape characters        |
| `comment.line.double-slash.glsl`  | Single-line comments     |
| `comment.block.glsl`              | Multi-line comments      |
| `variable.language.glsl.vertex`   | Vertex shader builtins   |
| `variable.language.glsl.fragment` | Fragment shader builtins |

---

## 🔧 Future Roadmap

- Add full type highlighting (`int`, `float`, `vec3`, `mat4`, etc.)
- Add built-in function highlighting (`sin()`, `mix()`, `normalize()`, etc.)
- Add uniforms, attributes, and qualifiers
- Improve live preview engine with full WebGL rendering
- Add validation and error reporting (GLSL parser integration)
- Optional: Vulkan/SPIR-V integration in future

---

## 📦 Why multiple language IDs?

This extension separates shader stages into multiple language IDs:

| Language ID | File Extension |
| ----------- | -------------- |
| `glsl`      | `.glsl`        |
| `glsl-vert` | `.vert`        |
| `glsl-frag` | `.frag`        |

This allows better stage-specific highlighting and preview control.

---

## 👨‍💻 Author

Developed by **Arjun P J**  
Shader developer | VSCode extension author

---

## 📄 License

[MIT License](LICENSE)
