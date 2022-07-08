import { FC, useRef } from "react";
import { ModalInfo } from "../App";
import useOnClickOutside from "../utils/useOnClickOutside";

interface InfoModalProps {
  modalInfo: ModalInfo | undefined;
  isOpen: boolean;
  handleClose: () => void;
}

const InfoModal: FC<InfoModalProps> = ({ modalInfo, isOpen, handleClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => handleClose());

  if (!modalInfo) return null;
  if (!isOpen) return null;
  const { coordinates, info } = modalInfo;
  return (
    <div
      ref={ref}
      className="absolute z-50 top-12 left-2 p-2 border bg-slate-500 text-gray-300 rounded-lg"
    >
      <div className="m-2">{info.address}</div>
      <div className="m-2">Registration/Matricule:</div>
      <div className="m-2">{info.id}</div>
      <div className="m-2">
        Last assessment: ${info.price.toLocaleString("en-US")}
      </div>
      <div className="m-2">
        Area: {(+info.area * 10.7639104167).toFixed(0).toLocaleString()} sf
      </div>
      <div className="m-2">
        Price per sf: {`$${info.psqft.toLocaleString("en-US")}`}
      </div>
      <div className="m-4 mt-8 flex">
        <div className="py-1 px-4 border rounded-lg hover:cursor-pointer hover:text-orange-500 hover:border-orange-500">
          <a
            target="_blank"
            href={
              "https://servicesenligne2.ville.montreal.qc.ca/sel/evalweb/index"
            }
          >
            Tax Records
          </a>
        </div>
      </div>
      <div className="m-4 flex">
        <div className="py-1 px-4 border rounded-lg hover:cursor-pointer hover:text-orange-500 hover:border-orange-500">
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${info.address.replace(
              / /g,
              "+"
            )},+Montréal,+QC`}
          >
            Streetview
          </a>
        </div>
      </div>
      <div className="m-4 flex">
        <div className="py-1 px-4 border rounded-lg hover:cursor-pointer hover:text-orange-500 hover:border-orange-500">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
