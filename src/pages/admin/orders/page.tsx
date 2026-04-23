import { useState } from "react";
import { toast } from "sonner";
import { useShop } from "@/hooks/use-shop";
import type { OrderStatus } from "@/types";
import { getDeliveryMethodLabel } from "@/lib/shipping";
import { cn } from "@/lib/utils";

const STATUSES: { value: OrderStatus; label: string; color: string }[] = [
  { value: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  { value: "processing", label: "En traitement", color: "bg-blue-100 text-blue-800" },
  { value: "shipped", label: "Expédié", color: "bg-purple-100 text-purple-800" },
  { value: "delivered", label: "Livré", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Annulé", color: "bg-red-100 text-red-800" },
];

function StatusBadge({ status }: { status: OrderStatus }) {
  const current = STATUSES.find((entry) => entry.value === status);

  return (
    <span
      className={cn(
        "text-[10px] font-bold tracking-widest uppercase px-2 py-1",
        current?.color ?? "bg-muted text-muted-foreground",
      )}
    >
      {current?.label ?? status}
    </span>
  );
}

function OrderRow({
  orderId,
  orderNumber,
  customerName,
  customerEmail,
  createdAt,
  total,
  shipping,
  status,
  items,
  shippingAddress,
  paymentMethod,
  onStatusChange,
}: {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  total: number;
  shipping: number;
  status: OrderStatus;
  items: {
    productName: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    wilayaCode?: string;
    deliveryMethod?: "domicile" | "bureau";
  };
  paymentMethod: string;
  onStatusChange: (id: string, nextStatus: OrderStatus) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr
        className="hover:bg-muted/50 transition-colors cursor-pointer"
        onClick={() => setOpen((current) => !current)}
      >
        <td className="px-4 py-3 font-mono text-xs font-medium">{orderNumber}</td>
        <td className="px-4 py-3">
          <p className="font-medium text-sm">{customerName}</p>
          <p className="text-xs text-muted-foreground">{customerEmail}</p>
        </td>
        <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
          {new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(createdAt))}
        </td>
        <td className="px-4 py-3 font-semibold">{total.toLocaleString("fr-DZ")} DZD</td>
        <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
          <select
            value={status}
            onChange={async (event) => {
              try {
                await onStatusChange(orderId, event.target.value as OrderStatus);
                toast.success("Statut mis à jour");
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Mise à jour impossible");
              }
            }}
            className="border border-input bg-background px-2 py-1 text-xs"
          >
            {STATUSES.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </td>
      </tr>
      {open ? (
        <tr>
          <td colSpan={5} className="px-4 pb-4 bg-muted/30 border-b border-border">
            <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2 text-muted-foreground">
                  Articles
                </p>
                <div className="space-y-1">
                  {items.map((item, index) => (
                    <div key={`${item.productName}-${index}`} className="flex justify-between gap-2">
                      <span className="text-muted-foreground truncate">
                        {item.productName} ({item.size}, {item.color}) x{item.quantity}
                      </span>
                      <span className="font-medium shrink-0">
                        {(item.price * item.quantity).toLocaleString("fr-DZ")} DZD
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2 text-muted-foreground">
                  Adresse de livraison
                </p>
                <p>
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>
                <p className="text-muted-foreground">{shippingAddress.address}</p>
                <p className="text-muted-foreground">
                  {shippingAddress.postalCode} {shippingAddress.city}
                </p>
                <p className="text-muted-foreground">{shippingAddress.country}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Livraison :{" "}
                  {shippingAddress.deliveryMethod
                    ? getDeliveryMethodLabel(shippingAddress.deliveryMethod)
                    : "Non precisee"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Frais de livraison : {shipping.toLocaleString("fr-DZ")} DZD
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Paiement : {paymentMethod}
                </p>
                <div className="mt-3">
                  <StatusBadge status={status} />
                </div>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useShop();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold">Commandes</h1>
        <p className="text-sm text-muted-foreground mt-1">{orders.length} commande(s)</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border">
          <p className="font-serif text-xl mb-2">Aucune commande</p>
          <p className="text-sm text-muted-foreground">
            Les commandes passées sur la boutique apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                  N° commande
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                  Client
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase hidden md:table-cell">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                  Total
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  orderId={order.id}
                  orderNumber={order.orderNumber}
                  customerName={order.customerName}
                  customerEmail={order.customerEmail}
                  createdAt={order.createdAt}
                  total={order.total}
                  shipping={order.shipping}
                  status={order.status}
                  items={order.items}
                  shippingAddress={order.shippingAddress}
                  paymentMethod={order.paymentMethod}
                  onStatusChange={updateOrderStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
