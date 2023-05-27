import { Stack } from "@mui/material";

export const PageNotFound = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      padding="20px"
      sx={{ gap: "15px" }}
    >
      <>Some friendly message :)</>
      <img
        src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
        alt="Page not found 404"
        width="688px"
      />
    </Stack>
  );
};
