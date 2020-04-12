package g37.cryapi.exchange;

import java.util.ArrayList;
import java.util.Random;
// JUST A MARKER TO SEE CHANGES
// todo: most of this class is just for prototype - in reality this should be class that actually posts and tracks the orders on exchanges
public class OrderHandler implements Runnable {
    private int maxSleepTime;
    private ArrayList<Order> orders;

    public OrderHandler(int maxSleepTime){
        this.maxSleepTime = maxSleepTime;
        this.orders = new ArrayList<>();
    }

    public synchronized void placeOrder(Order order) {
        this.orders.add(order);
        notifyAll();
    }

    private void removeOrder(Order order) {
        this.orders.remove(order);
    }

    private void removeOrder(int index) {
        this.orders.remove(index);
    }

    private void generateFulfil(Order order) {
        // todo: this is very just whatever
        double amountTOFulfil = new Random().nextDouble() * order.getInitialAmount()/2;
        order.fulFilAmount(amountTOFulfil);
    };

    private void handleOrders() {
        for (int i = 0; i < orders.size(); i++) {
            Order order = orders.get(i);

            //check if the order has been cancelled
            if(order.isCancelled()) {
                removeOrder(i);
                if(i != 0) {
                    i--;
                }
                continue;
            }
            generateFulfil(order);
            if(order.isComplete()) {
                removeOrder(order);
                if(i != 0) {
                    i--;
                }
            }
        }
    }

    public synchronized void waitForOrder() throws InterruptedException {
        while(orders.isEmpty()) {
            wait();
        }
    }

    @Override
    public void run() {
        while (!Thread.interrupted()) {
            try {
                this.waitForOrder();
                Thread.sleep(new Random().nextInt(this.maxSleepTime));
            } catch (InterruptedException e) {
                break;
            }
            this.handleOrders();
        }
    }
}
