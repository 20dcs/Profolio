// pages/[id].js
import { useRouter } from 'next/router';
import Home from '.';

const DynamicIdPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Home id={id}/>
    </div>
  );
};

export default DynamicIdPage;
