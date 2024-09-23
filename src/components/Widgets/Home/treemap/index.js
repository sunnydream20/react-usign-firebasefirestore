import { useState } from 'react';
import { BarLoader } from 'react-spinners';

import Box from '../../../_UI/box';
import TreemapChart from './treemap';

const override = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  backgroundColor: 'rgba(4, 165, 0, 0.52)',
  zIndex: 100,
};

const SP500Treemap = ({ widgetData }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Box title={'Widget 12\nTreemap'} width={325} height={560} treemapPadding={true} data={widgetData}>
      {loading && <BarLoader color="#00ff26" loading={loading} cssOverride={override} width="100%" height="4px" />}
      <TreemapChart setLoading={setLoading} />
    </Box>
  );
};

export default SP500Treemap;
