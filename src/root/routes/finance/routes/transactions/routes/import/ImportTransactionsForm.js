import { useState } from "react";
import { parse } from "ofx-js";

const ImportTransactionsForm = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <p>Upload a OFX file to import transactions.</p>
      <input
        disabled={loading}
        type="file"
        onChange={(e) => {
          // TODO: (lol) handle errors
          setLoading(true);
          const reader = new FileReader();
          reader.readAsText(e.target.files[0]);
          reader.addEventListener("load", (e) => {
            parse(e.target.result).then((ofxData) => {
              const transactions =
                ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
              const relevantTransactions = transactions.filter(
                ({ TRNTYPE }) => {
                  if (
                    TRNTYPE === "CHECK" ||
                    TRNTYPE === "PAYMENT" ||
                    TRNTYPE === "CASH" ||
                    TRNTYPE === "DIRECTDEP" ||
                    TRNTYPE === "DIRECTDEBIT" ||
                    TRNTYPE === "REPEATPMT"
                  ) {
                    alert("DETECTED UNHANDLED TRANSACTION TYPE");
                  }
                  return TRNTYPE === "DEBIT" || TRNTYPE === "POS";
                }
              );
              onChange(relevantTransactions);
            });
          });
        }}
      />
    </>
  );
};

export { ImportTransactionsForm };
