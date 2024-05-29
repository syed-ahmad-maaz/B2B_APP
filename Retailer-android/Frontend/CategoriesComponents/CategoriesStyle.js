import { StyleService } from "@ui-kitten/components";

const Style = StyleService.create({
  spacing: {
    backgroundColor: `#ffffff`,
    flexGrow: 1,
    padding: 8,
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
  },
  card: {
    // flexWrap: "wrap",
    // width: "45%",
    height: "55%",
    alignItems: "flex-start",
  },
  itemHeader: {
    height: 110,
    width: 150,
  },
});
export default Style;
