// pages/[id].js
import { useRouter } from 'next/router';
import Home from '.';

const DynamicIdPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <Home username={username}/>
    </div>
  );
};

export default DynamicIdPage;
