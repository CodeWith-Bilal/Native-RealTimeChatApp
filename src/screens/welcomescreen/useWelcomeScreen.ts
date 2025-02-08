import useNavigate from '../../hooks/useNavigationHook';


const useWelcomeScreen = () => {
    const {navigation} = useNavigate();
    return {navigation};
};
export default useWelcomeScreen;
