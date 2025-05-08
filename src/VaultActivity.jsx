import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css, createGlobalStyle } from 'styled-components';

// Import assets
import cetusIcon from './assets/CETUS.png';
import suiIcon from './assets/SUI.png';
import usdcIcon from './assets/USDC.png';
import deepIcon from './assets/DEEP.png';
import swapIcon from './assets/swap-icon.svg';
import addIcon from './assets/add-icon.svg';
import removeIcon from './assets/remove-icon.svg';
import externalLinkIcon from './assets/external-link-icon.svg';

// Simple row entrance animation
const rowEntrance = keyframes`
  0% { opacity: 0; transform: translateY(-6px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Global style
const GlobalStyle = createGlobalStyle`
  .animate-row-entrance {
    animation: ${rowEntrance} 0.35s ease-out;
  }
  
  /* Custom styling cho currency values */
  .currency-value {
    font-family: 'IBM Plex Mono', monospace;
    font-variant-numeric: tabular-nums;
    text-align: right;
    letter-spacing: -0.2px;
    white-space: nowrap;
  }
  
  /* Add table padding for inside content */
  .transaction-table {
    padding: 8px 0;
  }
`;

// Styled row components
const TableRow = styled.tr`
  border-bottom: 1px solid #262626;
  
  &:last-child {
    border-bottom: none;
  }
  
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(35, 35, 35, 0.4);
  }
  
  td {
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 500;
  }
  
  &.animate-row-entrance {
    animation: ${rowEntrance} 0.35s ease-out;
  }
`;

const LoadingRow = styled.tr`
  height: 80px;
  opacity: ${props => 1 - (props.index * 0.2)};
`;

const Container = styled.div`
  font-family: 'DM Sans', sans-serif;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  color: var(--text-primary);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
`;

const VaultActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1080px;
  width: 100%;
  padding-top: 40px;
  
  ${Title} {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Title = styled.h2`
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #FFFFFF;
  margin: 0;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#FDEBCF' : 'rgba(0, 0, 0, 0.3)'};
  color: ${props => props.active ? '#000000' : 'var(--text-primary)'};
  border: none;
  border-radius: 100px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.active ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const TableHead = styled.thead`
  background-color: #1A1A1A;
  color: var(--text-secondary);
  text-transform: uppercase;
  
  th {
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    padding: 6px 16px;
    letter-spacing: 0.5px;
    
    &:nth-child(5) {
      text-align: right;
      padding-right: 12px;
      padding-left: 6px;
    }
    
    &:nth-child(6) {
      text-align: center;
      white-space: nowrap;
      padding: 6px 12px;
    }
  }
`;

const ActivityButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.type) {
      case 'swap': return 'rgba(59, 130, 246, 0.1)';
      case 'add': return 'rgba(16, 185, 129, 0.1)';
      case 'remove': return 'rgba(249, 115, 22, 0.1)';
      default: return 'transparent';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'swap': return 'var(--accent-blue)';
      case 'add': return 'var(--accent-green)';
      case 'remove': return 'var(--accent-orange)';
      default: return 'white';
    }
  }};
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const TokenAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  
  .amount {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    font-size: 14px;
  }
  
  .symbol {
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.2);
  }
`;

const Value = styled.div`
  text-align: right;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  font-family: 'IBM Plex Mono', monospace;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  letter-spacing: -0.2px;
`;

const Address = styled.div`
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const PaginationText = styled.p`
  color: white;
  font-size: 16px;
  line-height: 24px;
  font-family: 'DM Sans', sans-serif;
`;

const PaginationNav = styled.nav`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  line-height: 24px;
  background-color: ${props => props.active ? '#FFF2D9' : 'rgba(13, 13, 13, 0.8)'};
  color: ${props => props.active ? '#000000' : '#FFFFFF'};
  opacity: ${props => props.disabled ? 0.3 : 1};
  font-weight: ${props => props.active ? 600 : 400};
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: opacity 0.2s;
  
  &:hover:not(:disabled) {
    opacity: 1;
  }
`;

const TransactionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  img {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    transform: scale(1.2);
  }
`;

const IconImg = styled.img`
  width: 24px;
  height: 24px;
`;

// Animation variants for insert
const insertVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.14, ease: 'easeOut' }
  }
};

// Function to get flicker color based on transaction type - simplified, used for button colors only
const getTypeColor = (type) => {
  switch (type) {
    case 'add': return 'var(--accent-green)';
    case 'remove': return 'var(--accent-orange)';
    case 'swap': 
    default: return 'var(--accent-blue)';
  }
};

// Random jitter timings for transaction updates (in ms) - wider range and slower
const TRANSACTION_INTERVALS = [1000, 1500, 2000, 2500, 3000, 3500];

// Random number generator within a range
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Generate random timestamp with consistent format
const getRandomTimestamp = (index) => {
  const now = new Date();
  
  // Generate a time in the past (index-based to ensure uniqueness)
  const minutesAgo = index * 15 + Math.floor(Math.random() * 15); // Some randomness but preserves order
  const pastDate = new Date(now.getTime() - minutesAgo * 60000);
  
  const day = pastDate.getDate().toString().padStart(2, '0');
  const month = (pastDate.getMonth() + 1).toString().padStart(2, '0');
  const year = pastDate.getFullYear();
  
  const hour = pastDate.getHours();
  const minute = pastDate.getMinutes().toString().padStart(2, '0');
  
  // Format hour for 12-hour format
  const hour12 = hour % 12 || 12;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  
  return `${month}/${day}/${year} ${hour12}:${minute} ${ampm}`;
};

// Generate random transaction hash
const getRandomTxHash = () => {
  return `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
};

// Random wallet addresses
const walletAddresses = [
  '0x8f43...8e86',
  '0x7a21...9b43',
  '0x3d52...4c11',
  '0xb19c...e442',
  '0xf93d...6a4d',
  '0x295e...cb37',
  '0xa3ec...f921',
  '0x6c41...2d95'
];

// Pick a random address
const getRandomAddress = () => {
  return walletAddresses[Math.floor(Math.random() * walletAddresses.length)];
};

// Pick a random transaction type
const getRandomType = () => {
  const types = ['swap', 'add', 'remove'];
  return types[Math.floor(Math.random() * types.length)];
};

// Pick a random token pair
const getRandomTokenPair = () => {
  return tokenPairs[Math.floor(Math.random() * tokenPairs.length)];
};

// Generate a random USD value between 100 and 50000
const getRandomUsdValue = () => {
  return parseFloat(getRandomNumber(100, 50000).toFixed(2));
};

// Token pairs
const tokenPairs = [
  {
    pair: 'DEEP-SUI',
    tokens: [
      { icon: deepIcon, symbol: 'DEEP' },
      { icon: suiIcon, symbol: 'SUI' }
    ]
  },
  {
    pair: 'SUI-USDC',
    tokens: [
      { icon: suiIcon, symbol: 'SUI' },
      { icon: usdcIcon, symbol: 'USDC' }
    ]
  },
  {
    pair: 'CETUS-SUI',
    tokens: [
      { icon: cetusIcon, symbol: 'CETUS' },
      { icon: suiIcon, symbol: 'SUI' }
    ]
  }
];

// Generate 100 mock transactions for pagination
const generateMockData = () => {
  const mockData = [];
  
  for (let i = 0; i < 100; i++) {
    const type = getRandomType();
    const selectedPair = getRandomTokenPair();
    
    // Generate amounts that make sense for the type
    let amount1, amount2;
    if (type === 'swap') {
      amount1 = parseFloat(getRandomNumber(50, 800).toFixed(2));
      amount2 = parseFloat(getRandomNumber(50, 800).toFixed(2));
    } else if (type === 'add') {
      amount1 = parseFloat(getRandomNumber(100, 1000).toFixed(2));
      amount2 = parseFloat(getRandomNumber(100, 1000).toFixed(2));
    } else { // remove
      amount1 = parseFloat(getRandomNumber(50, 500).toFixed(2));
      amount2 = parseFloat(getRandomNumber(50, 500).toFixed(2));
    }
    
    const value = getRandomUsdValue();
    
    mockData.push({
      id: i,
      type,
      time: getRandomTimestamp(i),
      address: getRandomAddress(),
      tokens: [
        { amount: amount1, symbol: selectedPair.tokens[0].symbol, icon: selectedPair.tokens[0].icon },
        { amount: amount2, symbol: selectedPair.tokens[1].symbol, icon: selectedPair.tokens[1].icon }
      ],
      value,
      txHash: getRandomTxHash(),
      isNew: false // Explicitly set this to false for initial data
    });
  }
  
  return mockData;
};

// Function to render activity icon
const renderActivityIcon = (type) => {
  switch (type) {
    case 'swap': return <IconImg src={swapIcon} alt="Swap" />;
    case 'add': return <IconImg src={addIcon} alt="Add" />;
    case 'remove': return <IconImg src={removeIcon} alt="Remove" />;
    default: return null;
  }
};

// Function to render activity label
const renderActivityLabel = (type) => {
  switch (type) {
    case 'swap': return 'Swap';
    case 'add': return 'Add';
    case 'remove': return 'Remove';
    default: return '';
  }
};

// Cập nhật hàm hiển thị giá trị tiền tệ
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// TableRow component - significantly simplified
const TableRowComponent = ({ activity, isNew }) => {  
  return (
    <TableRow className={isNew ? 'animate-row-entrance' : ''}>
      <td style={{ padding: '12px 16px' }}>
        <ActivityButton type={activity.type}>
          {renderActivityIcon(activity.type)}
          {renderActivityLabel(activity.type)}
        </ActivityButton>
      </td>
      <td style={{ padding: '12px 16px' }}>{activity.time}</td>
      <td style={{ padding: '12px 16px' }}>
        <Address>{activity.address}</Address>
      </td>
      <td style={{ padding: '12px 16px' }}>
        {activity.tokens.map((token, idx) => (
          <TokenAmount key={idx}>
            <img src={token.icon} alt={token.symbol} />
            <span className="amount">{token.amount.toFixed(2)}</span>
            <span className="symbol">{token.symbol}</span>
          </TokenAmount>
        ))}
      </td>
      <td style={{ padding: '12px 6px 12px 6px', textAlign: 'right' }}>
        <Value>
          <span className="currency-value">{formatCurrency(activity.value)}</span>
        </Value>
      </td>
      <td style={{ padding: '12px', textAlign: 'center' }}>
        <TransactionLink href={`https://explorer.sui.io/txblock/${activity.txHash}`} target="_blank" rel="noopener noreferrer">
          <img src={externalLinkIcon} alt="View transaction" />
        </TransactionLink>
      </td>
    </TableRow>
  );
};

const VaultActivity = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activities, setActivities] = useState([]);
  const [aiMetrics, setAiMetrics] = useState({
    apy: '0.0%',
    transactions: 0,
    lastUpdate: 'Just now'
  });
  const [loading, setLoading] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true); // Track if animations are enabled
  const pageSize = 10; // Number of items per page
  const lastInsertedId = useRef(null); // Reference to track last inserted transaction ID
  const transactionTimerRef = useRef(null); // Reference to store timer ID
  const transactionQueue = useRef([]); // Queue for upcoming transactions
  
  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setAnimationsEnabled(false);
      }
      
      // Listen for changes in the preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChange = (e) => {
        setAnimationsEnabled(!e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, []);
  
  // Function to create a new transaction
  const createNewTransaction = useCallback(() => {
    const type = getRandomType();
    const selectedPair = getRandomTokenPair();
    
    // Generate amounts that make sense for the type
    let amount1, amount2;
    if (type === 'swap') {
      amount1 = parseFloat(getRandomNumber(50, 800).toFixed(2));
      amount2 = parseFloat(getRandomNumber(50, 800).toFixed(2));
    } else if (type === 'add') {
      amount1 = parseFloat(getRandomNumber(100, 1000).toFixed(2));
      amount2 = parseFloat(getRandomNumber(100, 1000).toFixed(2));
    } else { // remove
      amount1 = parseFloat(getRandomNumber(50, 500).toFixed(2));
      amount2 = parseFloat(getRandomNumber(50, 500).toFixed(2));
    }
    
    const value = getRandomUsdValue();
    const newId = `new-${Date.now()}`;
    
    // Create new transaction with current timestamp
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, '0');
    const hour12 = hour % 12 || 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    return {
      id: newId,
      type,
      time: `${month}/${day}/${year} ${hour12}:${minute} ${ampm}`,
      address: getRandomAddress(),
      tokens: [
        { amount: amount1, symbol: selectedPair.tokens[0].symbol, icon: selectedPair.tokens[0].icon },
        { amount: amount2, symbol: selectedPair.tokens[1].symbol, icon: selectedPair.tokens[1].icon }
      ],
      value,
      txHash: getRandomTxHash()
    };
  }, []);
  
  // Process transaction queue at fixed intervals
  useEffect(() => {
    // Use a fixed interval
    const baseInterval = 2000; // 2 seconds between transactions
    
    // Process the queue at regular intervals
    transactionTimerRef.current = setInterval(() => {
      // Add a new transaction to the queue
      transactionQueue.current.push(createNewTransaction());
      
      // Process the next transaction from the queue
      if (transactionQueue.current.length > 0) {
        const nextTransaction = transactionQueue.current.shift();
        
        // Only set the lastInsertedId if animations are enabled
        if (animationsEnabled) {
          lastInsertedId.current = nextTransaction.id;
        }
        
        setActivities(prevActivities => {
          // Add to the beginning and keep total at 100
          return [nextTransaction, ...prevActivities.slice(0, 99)];
        });
        
        // If not on page 1, go to page 1 to see the new transaction
        setCurrentPage(page => page !== 1 ? 1 : page);
        
        // Clear the lastInsertedId after a delay to stop animation
        if (animationsEnabled) {
          setTimeout(() => {
            lastInsertedId.current = null;
          }, 500); // Increased delay to match longer animation
        }
      }
    }, baseInterval);
    
    return () => {
      if (transactionTimerRef.current) {
        clearInterval(transactionTimerRef.current);
      }
    };
  }, [createNewTransaction, animationsEnabled]);

  // Generate initial activities
  useEffect(() => {
    // Initial loading state
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      // Generate 100 mock transactions
      const mockActivities = generateMockData();
      
      setActivities(mockActivities);
      setLoading(false);
      
      // Start updating AI metrics
      updateAIMetrics();
      
      // Set up interval to update AI metrics periodically
      const metricsInterval = setInterval(() => {
        updateAIMetrics();
      }, 3000);
      
      return () => {
        clearInterval(metricsInterval);
      };
    }, 1000);
  }, []);
  
  // Update AI metrics
  const updateAIMetrics = () => {
    const newAPY = (15 + Math.random() * 8).toFixed(2) + '%';
    const newTransactions = aiMetrics.transactions + Math.floor(Math.random() * 3) + 1;
    
    setAiMetrics({
      apy: newAPY,
      transactions: newTransactions,
      lastUpdate: 'Just now'
    });
  };
  
  // Filter activities based on the selected filter
  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / pageSize));
  const currentActivities = filteredActivities.slice(
    (currentPage - 1) * pageSize, 
    currentPage * pageSize
  );
  
  // Calculate start and end of range text
  const start = filteredActivities.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredActivities.length);
  const total = filteredActivities.length;
  
  // Navigation functions
  const goToFirstPage = () => setCurrentPage(1);
  
  const goToLastPage = () => setCurrentPage(totalPages);
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPage = (page) => {
    setCurrentPage(page);
  };
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Display at most 3 page numbers, centered around current page if possible
    if (totalPages <= 3) {
      // Less than 3 pages total, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // More than 3 pages, determine which 3 to show
      if (currentPage === 1) {
        // First page selected, show first 3
        pages.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        // Last page selected, show last 3
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle page selected, show current and surrounding
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    
    return pages;
  };

  // Add a cleanup effect that will run on unmount
  useEffect(() => {
    return () => {
      // Clear any pending transaction timers on unmount
      if (transactionTimerRef.current) {
        clearInterval(transactionTimerRef.current);
        transactionTimerRef.current = null;
      }
    };
  }, []);

  return (
    <VaultActivityWrapper>
      <GlobalStyle />
      {/* Header wrapper */}
      <HeaderWrapper>
        <Title>Vault Activities</Title>
        <FilterGroup>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          active={filter === 'swap'} 
          onClick={() => setFilter('swap')}
        >
          Swap
        </FilterButton>
        <FilterButton 
          active={filter === 'add'} 
          onClick={() => setFilter('add')}
        >
          Add Liquidity
        </FilterButton>
        <FilterButton 
          active={filter === 'remove'} 
          onClick={() => setFilter('remove')}
        >
          Remove Liquidity
        </FilterButton>
        </FilterGroup>
      </HeaderWrapper>
      
      {/* Table card */}
      <Container>
      <Table className="transaction-table">
        <colgroup>
          <col style={{ width: '84px' }} />    {/* TYPE */}
          <col style={{ width: '160px' }} />   {/* TIME */}
          <col style={{ width: '180px' }} />   {/* VAULT ADDRESS */}
          <col style={{ minWidth: '220px' }} />{/* TOKENS (flex) */}
          <col style={{ width: '108px' }} />   {/* VALUE – tighter */}
          <col style={{ width: '80px' }} />    {/* TX HASH */}
        </colgroup>
        <TableHead>
          <tr>
            <th>TYPE</th>
            <th>TIME</th>
            <th>VAULT ADDRESS</th>
            <th>TOKENS</th>
            <th>VALUE</th>
            <th>TX HASH</th>
          </tr>
        </TableHead>
        <tbody>
          {loading ? (
            // Placeholder loading rows
            Array(5).fill().map((_, index) => (
              <LoadingRow key={`loading-${index}`} index={index}>
                <td colSpan={6}></td>
              </LoadingRow>
            ))
          ) : (
            currentActivities.map(activity => (
              <TableRowComponent 
                key={activity.id}
                activity={activity}
                isNew={animationsEnabled && activity.id === lastInsertedId.current}
              />
            ))
          )}
        </tbody>
      </Table>
      </Container>
      
      {/* Pagination */}
      {!loading && (
        <PaginationWrapper>
          <PaginationText>
            Showing {start}–{end} of {total} transactions
          </PaginationText>
          
          <PaginationNav>
            <PageButton 
              onClick={goToFirstPage} 
              disabled={currentPage === 1}
              aria-label="Go to first page"
            >
              «
            </PageButton>
            
            <PageButton 
              onClick={goToPrevPage} 
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              &lt;
            </PageButton>
            
            {getPageNumbers().map(page => (
              <PageButton
                key={page}
                active={currentPage === page}
                onClick={() => goToPage(page)}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </PageButton>
            ))}
            
            <PageButton 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              &gt;
            </PageButton>
            
            <PageButton 
              onClick={goToLastPage} 
              disabled={currentPage === totalPages}
              aria-label="Go to last page"
            >
              »
            </PageButton>
          </PaginationNav>
        </PaginationWrapper>
      )}
    </VaultActivityWrapper>
  );
};

export default VaultActivity; 