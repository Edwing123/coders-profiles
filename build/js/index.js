"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = require("ejs");
const path_1 = require("path");
const fs_1 = require("fs");
const yaml_1 = require("yaml");
fs_1.readdir(path_1.join(__dirname, '..', '..', 'meta'), (err, files) => {
    if (err)
        throw err;
    else
        files.forEach((file) => {
            if (/\.(yaml|yml)$/i.test(file))
                ejs_1.renderFile(path_1.join(__dirname, '..', '..', 'src', 'views', 'profile.ejs'), { parse: yaml_1.parse(fs_1.readFileSync(path_1.join(__dirname, '..', '..', 'meta', file)).toString()) }).then((html) => {
                    fs_1.writeFileSync(path_1.join(__dirname, '..', '..', 'build', 'html', file.split('.')[0] + '.html'), html);
                });
        });
});
ejs_1.renderFile(path_1.join(__dirname, '..', '..', 'src', 'views', 'index.ejs')).then((html) => {
    fs_1.writeFileSync(path_1.join(__dirname, '..', '..', 'build', 'html', 'index.html'), html);
});
//# sourceMappingURL=index.js.map