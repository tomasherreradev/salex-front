import { useNavigate } from 'react-router-dom';

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goTo = (path: string, state?: any, delay: number = 0) => {
    if(delay > 0) {
      setTimeout(()=> {
        navigate(path, {state})
      }, delay)
    } else {
      navigate(path, {state})
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const replace = (path: string, state?: any, delay: number = 0) => {
    if(delay > 0) {
      setTimeout(() => {
        navigate(path, { replace: true, state });      
      }, delay);
    } else {
        navigate(path, { replace: true, state });      
    }
  };

  return { goTo, goBack, replace };
};

export default useCustomNavigate;
