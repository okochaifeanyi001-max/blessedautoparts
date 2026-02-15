import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Card style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <CardHeader style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e9ecef', padding: '20px' }}>
          <CardTitle style={{ color: '#343a40', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            All Orders
          </CardTitle>
        </CardHeader>
        <CardContent style={{ padding: '20px' }}>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#f8f9fa' }}>
                <TableHead style={{ fontWeight: 'bold', color: '#495057', padding: '12px' }}>Order ID</TableHead>
                <TableHead style={{ fontWeight: 'bold', color: '#495057', padding: '12px' }}>Order Date</TableHead>
                <TableHead style={{ fontWeight: 'bold', color: '#495057', padding: '12px' }}>Order Status</TableHead>
                <TableHead style={{ fontWeight: 'bold', color: '#495057', padding: '12px' }}>Order Price</TableHead>
                <TableHead style={{ fontWeight: 'bold', color: '#495057', padding: '12px' }}>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <TableRow key={orderItem?._id} style={{ borderBottom: '1px solid #e9ecef', hover: { backgroundColor: '#f8f9fa' } }}>
                      <TableCell style={{ padding: '12px', color: '#6c757d' }}>{orderItem?._id}</TableCell>
                      <TableCell style={{ padding: '12px', color: '#6c757d' }}>{orderItem?.orderDate.split("T")[0]}</TableCell>
                      <TableCell style={{ padding: '12px' }}>
                        <Badge
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor:
                              orderItem?.orderStatus === "confirmed"
                                ? "#d4edda"
                                : orderItem?.orderStatus === "rejected"
                                ? "#f8d7da"
                                : "#e2e3e5",
                            color:
                              orderItem?.orderStatus === "confirmed"
                                ? "#155724"
                                : orderItem?.orderStatus === "rejected"
                                ? "#721c24"
                                : "#383d41"
                          }}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ padding: '12px', fontWeight: '900', color: '#28a745' }}>₦{orderItem?.totalAmount?.toLocaleString()}</TableCell>
                      <TableCell style={{ padding: '12px' }}>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() =>
                              handleFetchOrderDetails(orderItem?._id)
                            }
                            style={{
                              backgroundColor: '#007bff',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '14px'
                            }}
                          >
                            View Details
                          </Button>
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                : (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#6c757d', fontStyle: 'italic' }}>
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrdersView;
