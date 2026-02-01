import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[3px] md:border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-3 md:p-4 gap-2 md:gap-3">
        <Label className="text-xs md:text-sm break-words">Address: {addressInfo?.address}</Label>
        <Label className="text-xs md:text-sm">City: {addressInfo?.city}</Label>
        <Label className="text-xs md:text-sm">Pincode: {addressInfo?.pincode}</Label>
        <Label className="text-xs md:text-sm">Phone: {addressInfo?.phone}</Label>
        <Label className="text-xs md:text-sm break-words">Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-2 md:p-3 flex gap-2 justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)} className="flex-1 text-xs md:text-sm py-2">Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)} variant="destructive" className="flex-1 text-xs md:text-sm py-2">Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
