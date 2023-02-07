/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@angular-main-project/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './order-list.component.html',
    styles: []
})
export class OrderListComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    endsubs$: Subject<any> = new Subject();
    orderStatus = ORDER_STATUS;
    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this._getOrders();
    }

    ngOnDestroy() {
        this.endsubs$.next(true);
        this.endsubs$.complete();
    }

    _getOrders() {
        this.ordersService
            .getOrders()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((orders) => {
                this.orders = orders;
            });
    }

    showOrder(orderId) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }

    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this Order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService
                    .deleteOrder(orderId)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
                        () => {
                            this._getOrders();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Order is deleted!'
                            });
                        },
                        () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Order is not deleted!'
                            });
                        }
                    );
            }
        });
    }
}
