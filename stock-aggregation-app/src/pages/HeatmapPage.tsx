// src/components/ResultComponent.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../api/auth"; // Adjust the import path as necessary
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

interface DataType {
  // Adjust fields according to actual response structure
  id: string;
  name: string;
  value: string;
}

const ResultComponent: React.FC = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessToken();
        const res = await axios.get("YOUR_RESULT_API_URL", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data); // Adjust depending on structure
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      {data?.map((item) => (
        <Card key={item.id} style={{ margin: 10 }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography>{item.value}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ResultComponent;
