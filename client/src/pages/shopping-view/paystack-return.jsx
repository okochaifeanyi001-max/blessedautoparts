import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { verifyPaystackPayment } from "@/store/shop/order-slice";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function PaystackReturnPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

  useEffect(() => {
    if (reference && orderId) {
      dispatch(verifyPaystackPayment({ reference, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [reference, orderId, dispatch]);

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Processing Paystack Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaystackReturnPage;