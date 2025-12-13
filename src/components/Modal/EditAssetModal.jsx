import { useState, useEffect } from "react";
import UIModal from "../Shared/UIModal";
import UIButton from "../Shared/Button/UIButton";
import UITextField from "../Shared/UITextField/UITextField";

const EditAssetModal = ({ asset, isOpen, onClose, onUpdate }) => {
  const [updatedAsset, setUpdatedAsset] = useState({
    productName: "",
    productType: "",
    productQuantity: "",
    _id: "",
  });

  useEffect(() => {
    if (asset) {
      setUpdatedAsset({
        productName: asset.productName || "",
        productType: asset.productType || "",
        productQuantity: asset.productQuantity || "",
        _id: asset._id || "",
      });
    }
  }, [asset, setUpdatedAsset]);

  if (!isOpen) return null;

  return (
    <UIModal open={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-white">Edit Asset</h2>

      <UITextField
        label="Name"
        value={updatedAsset.productName}
        onChange={(e) =>
          setUpdatedAsset({ ...updatedAsset, productName: e.target.value })
        }
      />

      <UITextField
        label="Type"
        value={updatedAsset.productType}
        onChange={(e) =>
          setUpdatedAsset({ ...updatedAsset, productType: e.target.value })
        }
      />

      <UITextField
        label="Quantity"
        type="number"
        value={updatedAsset.productQuantity}
        onChange={(e) =>
          setUpdatedAsset({ ...updatedAsset, productQuantity: e.target.value })
        }
      />

      <div className="flex justify-end gap-3 mt-4">
        <UIButton onClick={onClose}>Cancel</UIButton>
        <UIButton color="success" onClick={() => onUpdate(updatedAsset)}>
          Update
        </UIButton>
      </div>
    </UIModal>
  );
};

export default EditAssetModal;
