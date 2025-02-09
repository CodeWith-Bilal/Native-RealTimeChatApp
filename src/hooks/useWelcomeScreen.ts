import useNavigate from './useNavigationHook';


const useWelcomeScreen = () => {
    const {navigation} = useNavigate();
    return {navigation};
};
export default useWelcomeScreen;
