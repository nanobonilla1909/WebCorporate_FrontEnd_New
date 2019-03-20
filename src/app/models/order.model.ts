import { OrderItem } from './order-item.model';

export class Order {
    created_at: Date;
    order_number: number;
    order_type_id: number;
    customer_id: number;
    payment_method_id: number;
    quotes: number;
    bank_id: number;
    token: string;
    total: number;
    order_status_id: number;
    delivery_id: number;
    code_auth: string;
    site_transaction_id: number;
    card: string;
    card_number: number;
    ticket: string;
    number_operation: number;
    comments: string;
    is_for_gift: boolean;
    bill_status: string;
    bill: string;
    bill_number: number;
    order_items: OrderItem[];
}
