import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// SVG icons for the tokens
const CetusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#0D0D0D"/>
    <path d="M16.8 12C16.8 14.651 14.651 16.8 12 16.8C9.34903 16.8 7.20001 14.651 7.20001 12C7.20001 9.34903 9.34903 7.20001 12 7.20001C14.651 7.20001 16.8 9.34903 16.8 12Z" stroke="#4CF1AC" strokeWidth="1.2"/>
    <path d="M16.9489 8.40541L8.40001 16.9543" stroke="#4CF1AC" strokeWidth="1.2"/>
  </svg>
);

const SuiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#6fbcff"/>
    <path d="M8.39999 14.4C9.50456 14.4 10.4 13.5046 10.4 12.4C10.4 11.2954 9.50456 10.4 8.39999 10.4C7.29542 10.4 6.39999 11.2954 6.39999 12.4C6.39999 13.5046 7.29542 14.4 8.39999 14.4Z" fill="white"/>
    <path d="M15.6 14.4C16.7046 14.4 17.6 13.5046 17.6 12.4C17.6 11.2954 16.7046 10.4 15.6 10.4C14.4954 10.4 13.6 11.2954 13.6 12.4C13.6 13.5046 14.4954 14.4 15.6 14.4Z" fill="white"/>
    <path d="M12 10.4C13.1046 10.4 14 9.50456 14 8.39999C14 7.29542 13.1046 6.39999 12 6.39999C10.8954 6.39999 10 7.29542 10 8.39999C10 9.50456 10.8954 10.4 12 10.4Z" fill="white"/>
    <path d="M12 18.4C13.1046 18.4 14 17.5046 14 16.4C14 15.2954 13.1046 14.4 12 14.4C10.8954 14.4 10 15.2954 10 16.4C10 17.5046 10.8954 18.4 12 18.4Z" fill="white"/>
  </svg>
);

const UsdcIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#2775CA"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 5.54541C16.5831 5.54541 20.2728 9.2351 20.2728 13.8182C20.2728 14.3819 20.2095 14.9319 20.0892 15.4637H17.4001V11.0546C17.4001 10.3091 16.851 9.59999 15.951 9.59999C15.3783 9.59999 14.901 9.87272 14.6465 10.3273C14.4001 9.81817 13.8456 9.49087 13.1728 9.49087C12.4273 9.49087 11.8819 9.83635 11.6092 10.391V9.70908H10.4455V15.4637H11.6092V12.2273C11.6092 11.3819 12.0819 10.91 12.7455 10.91C13.3728 10.91 13.7546 11.3455 13.7546 12.2273V15.4637H14.9183V12.2273C14.9183 11.3819 15.3964 10.91 16.0546 10.91C16.6819 10.91 17.0637 11.3455 17.0637 12.2273V15.4637H16.24C15.0978 17.3455 12.8074 18.5454 10.221 18.5454C6.75828 18.5454 3.94559 15.7327 3.94559 12.2728C3.94559 8.81271 6.75828 5.99999 10.2001 5.99999C10.8001 5.99999 11.3784 6.08181 11.9201 6.24545V7.71817C11.3965 7.49089 10.8182 7.36362 10.2001 7.36362C7.50922 7.36362 5.32741 9.54544 5.32741 12.2546C5.32741 14.9637 7.50922 17.1455 10.221 17.1455C12.371 17.1455 14.221 15.8091 15.0001 13.9637H12.6728V12.2273C12.6728 11.3819 13.1455 10.91 13.8092 10.91C14.4365 10.91 14.8183 11.3455 14.8183 12.2273V13.9637H11.6092V15.4637H12.0001C8.58374 15.4637 5.81831 12.6982 5.81831 9.28181C5.81831 5.86545 8.58374 3.09999 12.0001 3.09999C15.4165 3.09999 18.1819 5.86545 18.1819 9.28181V10.2273H19.9055C19.7455 9.14544 19.371 8.13635 18.8346 7.24544C19.5346 7.98181 20.091 8.85453 20.471 9.81817H19.2728C19.4855 10.2637 19.6619 10.7273 19.7892 11.2091H21.4165C21.7528 12.0455 21.9346 12.9455 21.9346 13.8819C21.9346 18.9637 17.6074 23.0909 12.2892 23.0909C7.00555 23.0909 2.74559 18.9637 2.74559 13.8819C2.74559 8.79999 7.00555 4.67271 12.2892 4.67271H12.0001V5.54541ZM7.13647 12.2546C7.13647 10.5455 8.47284 9.17271 10.2001 9.17271C10.4455 9.17271 10.6728 9.19999 10.8819 9.25453V7.85453C10.6546 7.81817 10.4274 7.79999 10.2001 7.79999C7.75102 7.79999 5.76376 9.78181 5.76376 12.2546C5.76376 14.7273 7.75102 16.7091 10.221 16.7091C12.0274 16.7091 13.5837 15.6728 14.2546 14.1273H12.6546C12.1455 14.9273 11.2455 15.4637 10.221 15.4637C8.47284 15.4637 7.13647 14.0909 7.13647 12.3819V12.2546Z" fill="white"/>
  </svg>
);

const DeepIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#2B63F0"/>
    <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="white"/>
    <circle cx="12" cy="12" r="2" fill="white"/>
  </svg>
);

// Activity type icons
const SwapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 17L4.5 14M4.5 14L7.5 11M4.5 14H16.5M16.5 7L19.5 10M19.5 10L16.5 13M19.5 10H7.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AddIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4V20M4 12H20" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RemoveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12H18" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 11V16C15 16.5523 14.5523 17 14 17H5C4.44772 17 4 16.5523 4 16V7C4 6.44772 4.44772 6 5 6H10M12 4H16V8M16 4L8 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Container = styled.div`
  font-family: 'DM Sans', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #000000;
  color: white;
  border-radius: 16px;
  padding: 16px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#F5F5F4' : '#18181B'};
  color: ${props => props.active ? '#000000' : '#FFFFFF'};
  border: none;
  border-radius: 100px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const TableHead = styled.thead`
  border-bottom: 1px solid #27272A;
  
  th {
    color: #A1A1AA;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    padding: 12px 16px;
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #27272A;
    
    &:last-child {
      border-bottom: none;
    }

    td {
      padding: 24px 16px;
      font-size: 14px;
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
      case 'swap': return '#3B82F6';
      case 'add': return '#10B981';
      case 'remove': return '#F97316';
      default: return 'white';
    }
  }};
`;

const TokenAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  
  .amount {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
  }
  
  .symbol {
    color: #A1A1AA;
  }
`;

const Value = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 16px;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? '#F5F5F4' : '#1F1F22'};
  color: ${props => props.active ? '#000000' : '#FFFFFF'};
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  
  .dot {
    width: 10px;
    height: 10px;
    background-color: #10B981;
    border-radius: 50%;
    margin-right: 8px;
    animation: pulse 1.5s infinite;
  }
  
  .text {
    font-size: 14px;
    color: #A1A1AA;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }
`;

// Random number generator within a range
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Generate random timestamp
const getRandomTimestamp = () => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
  return `05/12/2025 ${hour}:${minute} AM`;
};

// Generate random transaction hash
const getRandomTxHash = () => {
  return `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`;
};

// Token pairs
const tokenPairs = [
  {
    pair: 'DEEP-SUI',
    tokens: [
      { icon: <DeepIcon />, symbol: 'DEEP' },
      { icon: <SuiIcon />, symbol: 'SUI' }
    ]
  },
  {
    pair: 'SUI-USDC',
    tokens: [
      { icon: <SuiIcon />, symbol: 'SUI' },
      { icon: <UsdcIcon />, symbol: 'USDC' }
    ]
  },
  {
    pair: 'CETUS-SUI',
    tokens: [
      { icon: <CetusIcon />, symbol: 'CETUS' },
      { icon: <SuiIcon />, symbol: 'SUI' }
    ]
  }
];

const VaultActivity = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activities, setActivities] = useState([]);
  
  // Generate initial activities
  useEffect(() => {
    const initialActivities = [];
    
    for(let i = 0; i < 5; i++) {
      initialActivities.push(generateRandomActivity(i));
    }
    
    setActivities(initialActivities);
    
    // Set up interval to update activities
    const interval = setInterval(() => {
      updateActivities();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Generate a random activity
  const generateRandomActivity = (id) => {
    const activityTypes = ['swap', 'add', 'remove'];
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    
    // Select a random token pair
    const selectedPair = tokenPairs[Math.floor(Math.random() * tokenPairs.length)];
    
    const amount1 = parseFloat(getRandomNumber(50, 500).toFixed(2));
    const amount2 = parseFloat(getRandomNumber(50, 500).toFixed(2));
    const value = parseFloat((amount1 + amount2).toFixed(2));
    
    return {
      id,
      type,
      time: getRandomTimestamp(),
      address: '0x8f43...8e86',
      tokens: [
        { amount: amount1, symbol: selectedPair.tokens[0].symbol, icon: selectedPair.tokens[0].icon },
        { amount: amount2, symbol: selectedPair.tokens[1].symbol, icon: selectedPair.tokens[1].icon }
      ],
      value,
      txHash: getRandomTxHash()
    };
  };
  
  // Update activities with new ones
  const updateActivities = () => {
    setActivities(prevActivities => {
      const newActivity = generateRandomActivity(prevActivities.length);
      return [newActivity, ...prevActivities.slice(0, 4)];
    });
  };
  
  // Filter activities based on the selected filter
  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const renderActivityIcon = (type) => {
    switch (type) {
      case 'swap': return <SwapIcon />;
      case 'add': return <AddIcon />;
      case 'remove': return <RemoveIcon />;
      default: return null;
    }
  };
  
  const renderActivityLabel = (type) => {
    switch (type) {
      case 'swap': return 'Swap';
      case 'add': return 'Add';
      case 'remove': return 'Remove';
      default: return '';
    }
  };

  return (
    <Container>
      <StatusIndicator>
        <div className="dot"></div>
        <div className="text">AI Vault is actively running</div>
      </StatusIndicator>
      
      <FilterBar>
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
      </FilterBar>
      
      <Table>
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
        <TableBody>
          {filteredActivities.map((activity) => (
            <tr key={activity.id}>
              <td>
                <ActivityButton type={activity.type}>
                  {renderActivityIcon(activity.type)}
                  {renderActivityLabel(activity.type)}
                </ActivityButton>
              </td>
              <td>{activity.time}</td>
              <td>{activity.address}</td>
              <td>
                {activity.tokens.map((token, idx) => (
                  <TokenAmount key={idx}>
                    {token.icon}
                    <span className="amount">{token.amount.toFixed(2)}</span>
                    <span className="symbol">{token.symbol}</span>
                  </TokenAmount>
                ))}
              </td>
              <td>
                <Value>${activity.value.toFixed(2)}</Value>
              </td>
              <td>
                <a href={`https://explorer.sui.io/txblock/${activity.txHash}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon />
                </a>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
      
      <Pagination>
        <PageButton disabled={currentPage === 1}>
          ⟪
        </PageButton>
        <PageButton disabled={currentPage === 1}>
          ⟨
        </PageButton>
        <PageButton active={currentPage === 1}>
          1
        </PageButton>
        <PageButton>
          2
        </PageButton>
        <PageButton>
          3
        </PageButton>
        <PageButton>
          ⟩
        </PageButton>
        <PageButton>
          ⟫
        </PageButton>
      </Pagination>
    </Container>
  );
};

export default VaultActivity; 