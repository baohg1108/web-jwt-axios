import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { API_ROOT } from "~/utils/constants";
import { authorizedAxiosInstance } from "../utils/authorizedAxios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await authorizedAxiosInstance.get(
        `${API_ROOT}/v1/dashboards/access`
      );
      // console.log("Data from API:", res.data);
      // const userInfoFromLocalStorage = localStorage.getItem("userInfo");
      // console.log(
      //   "Data from localStorage: ",
      //   JSON.stringify(userInfoFromLocalStorage)
      // );
      setUser(res.data);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    // 1.localStorage: xóa thông tin user trong localstorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");

    //2. cookies: gọi API xử lý remove Cookies
    await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`);
    localStorage.removeItem("userInfo");
    setUser(null);

    // điều hướng tới login khi logout
    navigate("/login");
  };

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1120px",
        marginTop: "1em",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 1em",
      }}
    >
      <Alert
        severity="info"
        sx={{ ".MuiAlert-message": { overflow: "hidden" } }}
      >
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography
          variant="span"
          sx={{ fontWeight: "bold", "&:hover": { color: "#fdba26" } }}
        >
          {user?.email}
        </Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>

      <Button
        type="button"
        variant="contained"
        color="info"
        size="large"
        sx={{ mt: 2, maxWidth: "min-content", alignSelf: "flex-end" }}
        onClick={handleLogout}
      >
        Logout
      </Button>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default Dashboard;
