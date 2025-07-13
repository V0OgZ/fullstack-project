import React from 'react';
import './CreditsModal.css';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="credits-overlay" onClick={onClose}>
      <div className="credits-modal" onClick={(e) => e.stopPropagation()}>
        <div className="credits-header">
          <h2>Credits & Acknowledgments</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="credits-content">
          <section>
            <h3>🎮 Game Inspiration</h3>
            <p><strong>Heroes of Might and Magic III</strong></p>
            <p>New World Computing / 3DO Company (1999)</p>
            <p>This game is inspired by the classic turn-based strategy game. All game mechanics and visual design are original implementations.</p>
          </section>

          <section>
            <h3>🎨 Terrain Assets</h3>
            <p><strong>OpenGameArt.org</strong></p>
            <p>Grass, Forest, Mountain, Water, Desert, Swamp tiles</p>
            <p>License: CC0 (Public Domain)</p>
            <p>Source: <a href="https://opengameart.org/" target="_blank" rel="noopener noreferrer">https://opengameart.org/</a></p>
          </section>

          <section>
            <h3>⚔️ Character Assets</h3>
            <p><strong>OpenGameArt.org</strong></p>
            <p>Warrior, Mage, Dragon, Knight sprites</p>
            <p>License: CC0 (Public Domain)</p>
            <p>Source: <a href="https://opengameart.org/" target="_blank" rel="noopener noreferrer">https://opengameart.org/</a></p>
          </section>

          <section>
            <h3>🔤 Fonts</h3>
            <p><strong>Google Fonts - Cinzel</strong></p>
            <p>License: Open Font License</p>
            <p>Source: <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">https://fonts.google.com/</a></p>
          </section>

          <section>
            <h3>💻 Development</h3>
            <p><strong>React + TypeScript</strong> - Facebook / Microsoft (MIT License)</p>
            <p><strong>Zustand</strong> - State management (MIT License)</p>
            <p><strong>Custom CSS & UI</strong> - Original work by development team</p>
          </section>

          <section>
            <h3>📄 License</h3>
            <p>This project is open source and available under the MIT License.</p>
            <p>All original code and custom assets are released under the MIT License.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreditsModal; 