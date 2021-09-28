import React from "react";
import { theme } from "./css/MaterialUi_CSS.js";
import { ThemeProvider } from "@material-ui/core";
import { SearchModel } from "./model/searchModel";
import Layout from "./components/Layout";
import CardsBox from "./components/CardsBox";

const searchModel = new SearchModel();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout model={searchModel}>
        <div style={{ padding: 20 }}>
          <CardsBox model={searchModel} />
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
