import type { ReactNode } from 'react';

interface CodeBlockProps {
  snippets: string[];
}

const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break',
  'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',
  'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal',
  'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
]);

type TokenKind = 'keyword' | 'string' | 'number' | 'comment' | 'plain';

interface Token {
  kind: TokenKind;
  value: string;
}

const TOKEN_CLASS: Record<TokenKind, string> = {
  keyword: 'text-[#22944c]',
  string: 'text-[#bf7c3d]',
  number: 'text-[#4f77e3]',
  comment: 'text-[#9a9a9a]',
  plain: 'text-[var(--color-text)]',
};

const TOKEN_PATTERN =
  /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(0x[\da-fA-F]+|\d+\.?\d*(?:e[+-]?\d+)?)\b|\b([A-Za-z_][\w]*)\b/gm;

function highlightPython(code: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_PATTERN.lastIndex = 0;

  while ((match = TOKEN_PATTERN.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ kind: 'plain', value: code.slice(lastIndex, match.index) });
    }

    const [full, comment, string, number, ident] = match;

    if (comment) {
      tokens.push({ kind: 'comment', value: comment });
    } else if (string) {
      tokens.push({ kind: 'string', value: string });
    } else if (number) {
      tokens.push({ kind: 'number', value: number });
    } else if (ident) {
      tokens.push({
        kind: KEYWORDS.has(ident) ? 'keyword' : 'plain',
        value: ident,
      });
    } else {
      tokens.push({ kind: 'plain', value: full });
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < code.length) {
    tokens.push({ kind: 'plain', value: code.slice(lastIndex) });
  }

  return tokens;
}

function renderTokens(tokens: Token[]): ReactNode[] {
  return tokens.map((token, index) => (
    <span key={`${token.kind}-${index}`} className={TOKEN_CLASS[token.kind]}>
      {token.value}
    </span>
  ));
}

function CodeBlock({ snippets }: CodeBlockProps) {
  return (
    <div
      className={`mt-8 grid w-full gap-4 ${
        snippets.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
      }`}
    >
      {snippets.map((code) => (
        <pre
          key={code.slice(0, 32)}
          className="m-0 min-w-0 overflow-x-auto rounded-[8px] bg-[#f6f6f6] p-4 text-[0.82rem] leading-relaxed [font-variation-settings:'wght'_400]"
        >
          <code className="font-mono whitespace-pre">
            {renderTokens(highlightPython(code))}
          </code>
        </pre>
      ))}
    </div>
  );
}

export default CodeBlock;
