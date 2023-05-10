import { DataSource} from "typeorm"
import { Category } from "./listitems";

export const AppDataSource = new DataSource({
      type: "react-native",
      database: "./main.sqlite",
      location: "default",
      logging: ["error"],
      entities: [Category],
      synchronize: true,
      driver: require("typeorm-react-native-adapter").ReactNativeDriver,
})

 