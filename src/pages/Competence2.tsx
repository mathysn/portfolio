import React, { useEffect, useState } from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import CompetenceNav from '../components/CompetenceNav';

const Competence2: React.FC = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/portfolio/competence2.md')
      .then(res => res.text())
      .then(setMarkdown);
  }, []);

  return (
    <div className="flex w-full max-w-7xl mx-auto py-16 pt-32 gap-12">
      <div className="sticky top-28 h-fit">
        <CompetenceNav />
      </div>
      <div className="flex-1 px-8">
        <MarkdownRenderer markdown={markdown} />
      </div>
    </div>
  );
};

export default Competence2;
