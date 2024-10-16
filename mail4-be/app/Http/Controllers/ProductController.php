<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function addProduct(Request $request){
        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        if($product->save()){
            return response([
                "message" => "Product is added successfully."
            ]);
        }       
    }

    public function readAllProducts(Request $request){
        $products = Product::all();
        return $products;
    }

    //fetching products with invoice id
    public function getProductById($product_id)
    {
        $product = Product::where('id', $product_id)->get();
        return $product;
    }

    public function deleteProductById($product_id)
    {
        $product = Product::where('id', $product_id)->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response([
            "message"=> "Successfully deleted the product."
        ]);
    }

    public function readAllTopProducts(){
        $topProducts = DB::select("SELECT p.id, p.name, SUM(o.quantity) AS total_quantity
        FROM products p
        JOIN orders o ON p.id = o.product_id
        GROUP BY p.id, p.name
        ORDER BY total_quantity DESC
        LIMIT 5;");
        return $topProducts;
    }

    public function editProduct(Request $request)
    {
        // Validate the request inputs
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
        ]);

        $product = Product::findOrFail($request->id);
        $product->name = $validated['name'];
        $product->price = $validated['price'];
        if($product->save()){
            return response([
                "message" => "Product is updated successfully."
            ]);
        }   
    }
}
