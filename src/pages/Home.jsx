import {
  IonContent,
  IonPage,
} from "@ionic/react";
import Consultant from "../components/Consultant/Consultant";
import DatePicker from "../components/DatePicker/DatePicker";
import TimePicker from "../components/TimePicker/TimePicker";
import Information from "../components/Information/Information"
import "./Home.css";

const Home = () => {
  //const [messages, setMessages] = useState<Message[]>([]);

  return (
    <IonPage id="home-page">
      <IonContent>
        <Consultant />
        <DatePicker endDate={30} />
        <TimePicker timeStart={9} timeEnd={22} />
        <Information/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
