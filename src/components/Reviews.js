import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  Rating,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import ratingData from "./rating.json";
import Swal from "sweetalert2";
export default function ReviewsPage() {
  // بيانات المراجعات
  // يمكنك استبدال هذا بمصدر بيانات حقيقي
  // مثل API أو قاعدة بيانات

  const [reviews, setReviews] = useState(
    localStorage.getItem("reviews")
      ? JSON.parse(localStorage.getItem("reviews"))
      : ratingData
  );

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleSubmit = () => {
    if (!newReview.name || !newReview.comment || newReview.rating === 0) {
      Swal.fire({
        title: "إنتبـه !",
        text: "يرجى ملء جميع الحقول",
        icon: "warning",
        timer: 2000, // يغلق تلقائيًا بعد 3 ثوانٍ
        showConfirmButton: false,
      });
      return;
    } else {
      const today = new Date().toISOString().split("T")[0];
      setReviews([{ ...newReview, date: today }, ...reviews]);
      setNewReview({ name: "", rating: 0, comment: "" });
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
      : 0;
  React.useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);
  return (
    <Box
      sx={{
        padding: { xs: 2, md: 6 },
        backgroundColor: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        تقييمات العملاء
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        نحن نقدر رأيك! اطلع على ما قاله الآخرون أو أضف مراجعتك.
      </Typography>

      {/* التقييم العام */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        gap={2}
        mb={4}
      >
        <Rating value={avgRating} precision={0.5} readOnly />
        <Typography>{avgRating.toFixed(1)} / 5</Typography>
        <Typography variant="body2" color="text.secondary">
          ({reviews.length} مراجعة)
        </Typography>
      </Box>

      {/* نموذج المراجعة */}
      <Paper sx={{ padding: 3, marginBottom: 5 }}>
        <Typography variant="h6" gutterBottom>
          أضف مراجعتك
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="الاسم"
              fullWidth
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Rating
              value={newReview.rating}
              onChange={(e, newValue) =>
                setNewReview({ ...newReview, rating: newValue })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="تعليقك"
              multiline
              rows={3}
              fullWidth
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              إرسال
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* عرض المراجعات */}
      <Grid container spacing={3}>
        {reviews.map((rev, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Paper sx={{ padding: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{rev.name[0]}</Avatar>
                <Box>
                  <Typography fontWeight="bold">{rev.name}</Typography>
                  <Rating value={rev.rating} readOnly size="small" />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {rev.date}
              </Typography>
              <Typography mt={1}>{rev.comment}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
