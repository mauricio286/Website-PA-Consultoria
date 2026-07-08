import React from 'react';

// Formatos básicos do Lexical (bitmasks de formatação de texto)
// 1 = BOLD
// 2 = ITALIC
// 4 = UNDERLINE
// 8 = STRIKETHROUGH
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_UNDERLINE = 4;
const IS_STRIKETHROUGH = 8;

interface LexicalNode {
  type: string;
  version?: number;
  text?: string;
  format?: number;
  style?: string;
  tag?: string;
  url?: string;
  listType?: 'bullet' | 'number';
  children?: LexicalNode[];
}

interface LexicalRendererProps {
  content: {
    root?: {
      children?: LexicalNode[];
    };
  } | null | undefined;
}

export default function LexicalRenderer({ content }: LexicalRendererProps) {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    if (!node) return null;

    // Renderização de textos (Folhas/Leaves da árvore)
    if (node.type === 'text') {
      let element: React.ReactNode = node.text || '';
      const format = node.format || 0;

      if (format & IS_BOLD) {
        element = <strong key={index}>{element}</strong>;
      }
      if (format & IS_ITALIC) {
        element = <em key={index}>{element}</em>;
      }
      if (format & IS_UNDERLINE) {
        element = <span key={index} style={{ textDecoration: 'underline' }}>{element}</span>;
      }
      if (format & IS_STRIKETHROUGH) {
        element = <span key={index} style={{ textDecoration: 'line-through' }}>{element}</span>;
      }

      return <React.Fragment key={index}>{element}</React.Fragment>;
    }

    // Renderização de filhos recursivamente
    const children = node.children ? node.children.map((child, idx) => renderNode(child, idx)) : null;

    switch (node.type) {
      case 'paragraph':
        return <p key={index} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{children}</p>;

      case 'heading': {
        const HeadingTag = (node.tag || 'h2') as keyof React.JSX.IntrinsicElements;
        return <HeadingTag key={index} style={{ margin: '1.5rem 0 1rem', fontWeight: 'bold' }}>{children}</HeadingTag>;
      }

      case 'list': {
        if (node.listType === 'number') {
          return <ol key={index} style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'decimal' }}>{children}</ol>;
        }
        return <ul key={index} style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>{children}</ul>;
      }

      case 'listitem':
        return <li key={index} style={{ marginBottom: '0.25rem' }}>{children}</li>;

      case 'quote':
        return (
          <blockquote key={index} style={{ borderLeft: '4px solid #ccc', paddingLeft: '1rem', margin: '1rem 0', color: '#666', fontStyle: 'italic' }}>
            {children}
          </blockquote>
        );

      case 'link':
        return (
          <a key={index} href={node.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>
            {children}
          </a>
        );

      case 'horizontalrule':
        return <hr key={index} style={{ border: 'none', borderTop: '1px solid #eee', margin: '2rem 0' }} />;

      default:
        // Caso o nó seja desconhecido, apenas renderiza os filhos recursivamente
        return <React.Fragment key={index}>{children}</React.Fragment>;
    }
  };

  return (
    <div className="lexical-rich-text">
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}
