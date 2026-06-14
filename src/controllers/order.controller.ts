import { prisma } from "../lib/prisma";

export async function createOrder(
  req: any,
  res: any
) {
  try {

    const { items } = req.body;

    let total = 0;

    for (const item of items) {

      const product =
        await prisma.product.findUnique({
          where: {
            id: item.productId
          }
        });

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      total +=
        product.price *
        item.quantity;
    }

    const order =
      await prisma.order.create({
        data: {
          userId: req.user.userId,
          total
        }
      });

    for (const item of items) {

      const product =
        await prisma.product.findUnique({
          where: {
            id: item.productId
          }
        });

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product!.price
        }
      });
    }

    const io = req.app.get("io");

    io.emit("new-order", {
      orderId: order.id,
      total: order.total,
      status: order.status
    });

    return res.status(201).json(order);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to create order"
    });
  }
}

export async function getOrders(
  req: any,
  res: any
) {
  try {

    const orders =
      await prisma.order.findMany({
        where: {
          userId: req.user.userId
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });

    return res.json(orders);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
}