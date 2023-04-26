import React, { useCallback } from 'react';
import { type PageName } from '../../types';
import { useStore } from '../../useStore';
import './Link.scss';

interface LinkProps {
  text: string
  page: PageName
  onPress?: () => void
};

const Link: React.FC<LinkProps> = ({ text, page, onPress }) => {
  const store = useStore();
  const handleClick = useCallback(() => {
    store.setCurrentPage(page);
    onPress?.();
  }, []);

  return (
        <div className="btn" onClick={handleClick}>
            {text}
        </div>
  );
};
export default Link;
