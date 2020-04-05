package g37.cryapi.exchange;

import java.util.ArrayList;
import java.util.Random;

// todo: most of this class is just for prototype
public class OrderHandler implements Runnable {
    private long maxSleepTime;
    private ArrayList<Order> orders;

    public OrderHandler(long maxSleepTime){
        this.maxSleepTime = maxSleepTime;
        this.orders = new ArrayList<>();
    }

    private void addOrder(Order order) {
        this.orders.add(order);
        notifyAll();
    }

    private void removeOrder(Order order) {
        this.orders.remove(order);
    }

    private void generateFulfil(Order order) {
        // todo: this is very just whatever
        double amountTOFulfil = 4 + new Random().nextDouble() * order.getInitialAmount();
        order.fulFilAmount(amountTOFulfil);
    };

    public synchronized void waitForOrder() throws InterruptedException {
        while(orders.isEmpty()) {
            wait();
        }
    }

    @Override
    public void run() {
        try {
            this.waitForOrder();
        } catch (InterruptedException e) {};

    }
}
