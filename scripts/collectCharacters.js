import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 指定ディレクトリ内のファイルを再帰的に読み込む関数
function readFilesFromDirectory(dir, allChars = new Set()) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      readFilesFromDirectory(fullPath, allChars);
    } else if (stat.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('').forEach(char => allChars.add(char));
    }
  });

  return allChars;
}

const startDir = 'src/';
export const allChars = readFilesFromDirectory(startDir);

// allChars を空白区切りで出力
console.log([...allChars].join(' '));


// サブセット化する文字とフォントファイルのパス
const chars = [...allChars].join('');
// chars の " $ ` \ をエスケープ、改行は削除
const charsEscaped = chars
  .replace(/\\/g, '\\\\')
  .replace(/"/g, '\\"')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$')
  .replace(/\n/g, '');
console.log([...charsEscaped].join(' '));
const fontPath = './public/fonts/LightNovelPOPv2.otf';
const subsetFontPath = './public/fonts/LightNovelPOPv2-subset.ttf';

// fonttoolsを使用する例
const cmd = `pyftsubset ${fontPath} --text="${charsEscaped}" --output-file=${subsetFontPath}`;

try {
  execSync(cmd);
  console.log('サブセットフォントを作成しました。');
} catch (error) {
  console.error('サブセットフォントの作成に失敗しました。', error);
}

