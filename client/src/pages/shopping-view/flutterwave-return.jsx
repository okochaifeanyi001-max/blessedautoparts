import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { verifyFlutterwavePayment } from "@/store/shop/order-slice";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function FlutterwaveReturnPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const transaction_id = searchParams.get("transaction_id");
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

  useEffect(() => {
    if (transaction_id && orderId) {
      dispatch(verifyFlutterwavePayment({ transaction_id, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [transaction_id, orderId, dispatch]);

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Processing Flutterwave Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default FlutterwaveReturnPage;