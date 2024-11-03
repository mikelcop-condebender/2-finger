import React from "react";
import { useParams } from "react-router-dom";
import { Design1 } from "./design_1/Design1";
import { Design2 } from "./design_2/Design2";
import { Design3 } from "./design_3/Design3";
import { Design4 } from "./design_4/Design4";

const DesignDetail: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();

  function Page() {
    if (!id) {
      return <p>Design not found</p>;
    }

    switch (id) {
      case "1":
        return <Design1 />;
      case "2":
        return <Design2 />;
      case "3":
        return <Design3 />;
      case "4":
        return <Design4 />;
      default:
        return <p>Design not found</p>;
    }
  }

  return <Page />;
};

export default DesignDetail;
