import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation";
import { RouteProp } from "@react-navigation/native";

type ContactsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Contacts'>;
type ContactsScreenRouteProp = RouteProp<RootStackParamList, 'Contacts'>;

export type ContactsProps = {
  navigation: ContactsScreenNavigationProp;
  route: ContactsScreenRouteProp;
};
