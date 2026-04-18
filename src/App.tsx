import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Share2, Heart, Users, Briefcase } from 'lucide-react';
import { useAppStore } from './store';
import { calculateScore, getResultInfo, CATEGORY_ICON, CATEGORIES } from './utils';
import './App.css';

function IntroStage() {
  const startApp = useAppStore((s) => s.startApp);

  return (
    <motion.div
      className="stage"
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className="intro-logo"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <img src={`${import.meta.env.BASE_URL}logo2.png`} alt="우리 사이 궁합은?" />
      </motion.div>

      <motion.h1
        className="intro-title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        우리 사이 궁합은?
      </motion.h1>

      <motion.p
        className="intro-subtitle"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        이름 속에 숨겨진 운명의 점수를 확인하세요
      </motion.p>

      <motion.div
        className="intro-features"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="feature-item">
          <div className="feature-icon icon-pink"><Heart size={20} /></div>
          <div className="feature-text">
            <strong>연인 궁합</strong>
            <span>둘 사이의 운명 점수를 확인해요</span>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon icon-blue"><Users size={20} /></div>
          <div className="feature-text">
            <strong>친구 궁합</strong>
            <span>우정의 케미를 알아보세요</span>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon icon-amber"><Briefcase size={20} /></div>
          <div className="feature-text">
            <strong>사업 궁합</strong>
            <span>비즈니스 파트너와의 시너지를 확인해요</span>
          </div>
        </div>
      </motion.div>

      <div className="intro-bottom">
        <motion.button
          className="submit-button"
          onClick={startApp}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          시작하기
        </motion.button>
      </div>
    </motion.div>
  );
}

function InputStage() {
  const { nameA, nameB, category, shouldFocusNameB, setNameA, setNameB, setCategory, showResult, clearFocusFlag } =
    useAppStore();
  const nameBRef = useRef<HTMLInputElement>(null);
  const canSubmit = nameA.trim().length > 0 && nameB.trim().length > 0;

  useEffect(() => {
    if (shouldFocusNameB && nameBRef.current) {
      nameBRef.current.focus();
      clearFocusFlag();
    }
  }, [shouldFocusNameB, clearFocusFlag]);

  return (
    <motion.div
      className="stage"
      key="input"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="input-title">우리 사이 궁합은?</h1>
      <p className="input-subtitle">두 사람의 이름을 입력해 보세요</p>

      <div className="input-group">
        <input
          className="input-field"
          type="text"
          placeholder="내 이름"
          maxLength={15}
          value={nameA}
          onChange={(e) => setNameA(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="상대 이름"
          maxLength={15}
          value={nameB}
          onChange={(e) => setNameB(e.target.value)}
          ref={nameBRef}
        />
      </div>

      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-tab${category === cat ? ' active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {CATEGORY_ICON[cat]} {cat}
          </button>
        ))}
      </div>

      <button className="submit-button" disabled={!canSubmit} onClick={showResult}>
        결과 보기
      </button>
    </motion.div>
  );
}

function ResultStage() {
  const { nameA, nameB, category, tryAnother } = useAppStore();
  const score = calculateScore(nameA, nameB, category);
  const { text, colorClass } = getResultInfo(score);

  return (
    <motion.div
      className="stage"
      key="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="result-names">
        <span className="result-name">{nameA}</span>
        <span className="result-icon">{CATEGORY_ICON[category]}</span>
        <span className="result-name">{nameB}</span>
      </div>

      <motion.div
        className={`score-display ${colorClass}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
      >
        {score}
      </motion.div>

      <motion.p
        className={`result-text ${colorClass}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {text}
      </motion.p>

      <button className="try-another-button" onClick={tryAnother}>
        다른 이름이랑 하기
      </button>
    </motion.div>
  );
}

function BottomNav() {
  const resetAll = useAppStore((s) => s.resetAll);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: '우리 사이 궁합은?',
        text: '이름으로 알아보는 우리 사이 궁합!',
        url: window.location.href,
      });
    } catch {
      // 사용자가 공유를 취소하거나 미지원 브라우저
    }
  };

  return (
    <nav className="bottom-nav">
      <button className="nav-button" onClick={resetAll}>
        <RotateCcw size={18} />
        다시 만들기
      </button>
      <button className="nav-button" onClick={handleShare}>
        <Share2 size={18} />
        공유하기
      </button>
    </nav>
  );
}

export default function App() {
  const { isIntro, stage } = useAppStore();

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {isIntro ? (
          <IntroStage />
        ) : stage === 'input' ? (
          <InputStage />
        ) : (
          <ResultStage />
        )}
      </AnimatePresence>
      {!isIntro && stage === 'result' && <BottomNav />}
    </div>
  );
}
