import { useEffect, useState } from 'react';
import Box from '../../../_UI/box';
import FinancialNewsPopular from '../../../_UI/financial-popular';
import { authenticateAnonymously, getFinancialNews } from '../../../../services/db.service';

const FinancialNewsPopularWidget = ({ widgetData }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    authenticateAnonymously().then(async () => {
      const data = await getFinancialNews();
      setPosts(data.newsFeed);
    });
  }, []);

  return (
    <Box title={'Financial Nes \n1 Most Popular'} width={325} height={560} data={widgetData}>
      <FinancialNewsPopular posts={posts} />
    </Box>
  );
};

export default FinancialNewsPopularWidget;
