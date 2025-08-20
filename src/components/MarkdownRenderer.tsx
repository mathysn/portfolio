import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css/github-markdown.css';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => (
  <div className="markdown-body prose prose-lg max-w-none w-full bg-transparent"
    style={{
      color: '#e5e7eb',
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
    }}
  >
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({node, ...props}) => (
          <h1
            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 mb-6 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] w-fit"
            {...props}
          />
        ),
        h2: ({node, ...props}) => (
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] w-fit"
            {...props}
          />
        ),
        h3: ({node, ...props}) => (
          <h3
            className="text-2xl font-bold mb-2 text-blue-400"
            {...props}
          />
        ),
        a: ({node, ...props}) => (
          <a
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 border-transparent transition duration-200 px-1 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        p: ({node, ...props}) => (
          <p className="text-base md:text-lg text-gray-200 mb-6 text-justify" {...props} />
        ),
        ul: ({node, ...props}) => (
          <ul className="list-disc pl-6 mb-6" {...props} />
        ),
        ol: ({node, ...props}) => (
          <ol className="list-decimal pl-6 mb-6" {...props} />
        ),
        li: ({node, ...props}) => (
          <li className="mb-2" {...props} />
        ),
        img: ({node, ...props}) => (
          <img className="rounded-xl shadow-lg my-6 mx-auto max-w-full" {...props} />
        ),
        blockquote: ({node, ...props}) => (
          <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-300 my-6" {...props} />
        ),
        code: ({node, ...props}) => (
          <code className="bg-gray-800 text-green-400 px-2 py-1 rounded" {...props} />
        ),
      }}
    >{markdown}</ReactMarkdown>
  </div>
);

export default MarkdownRenderer;
