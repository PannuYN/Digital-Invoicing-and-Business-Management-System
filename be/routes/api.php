<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('addProduct', [ProductController::class,'addProduct']);
Route::post('editProduct', [ProductController::class,'editProduct']);
Route::post('addInvoice', [InvoiceController::class,'addInvoice']);
Route::post('addOrder', [OrderController::class,'addOrder']);
Route::post('addClient', [ClientController::class,'addClient']);
Route::post('addMultipleOrders', [OrderController::class,'addMultipleOrders']);
Route::post('sendMail', [OrderController::class,'sendMail']);
Route::post('sendMultipleMails', [OrderController::class,'sendMultipleMails']);
Route::post('sendMultipleAlerts', [OrderController::class,'sendMultipleAlerts']);
Route::post('sendMultipleRealInvoices', [OrderController::class,'sendMultipleRealInvoices']);
Route::post('getInvoicesByDateRange', [InvoiceController::class,'getInvoicesByDateRange']);

Route::get('readAllProducts', [ProductController::class,'readAllProducts']);
Route::get('readAllTopProducts', [ProductController::class,'readAllTopProducts']);
Route::get('readAllInvoices', [InvoiceController::class,'readAllInvoices']);
Route::get('readInvoiceCreators', [InvoiceController::class,'readInvoiceCreators']);
Route::get('readAllClients', [ClientController::class,'readAllClients']);
Route::get('readAllTopClients', [ClientController::class,'readAllTopClients']);
Route::get('readAllOrders', [OrderController::class, 'readAllOrders']);
Route::get('readAllSentInvoices', [InvoiceController::class,'readAllSentInvoices']);
Route::get('readAllUnsentInvoices', [InvoiceController::class,'readAllUnsentInvoices']);
Route::get('getOrdersByInvoiceId/{invoice_id}', [OrderController::class, 'getOrdersByInvoiceId']);
Route::get('getProductById/{product_id}', [ProductController::class, 'getProductById']);
Route::get('deleteProductById/{product_id}', [ProductController::class, 'deleteProductById']);
Route::post('deleteInvoices', [InvoiceController::class, 'deleteInvoices']);
Route::get('getClientById/{client_id}', [ClientController::class, 'getClientById']);
Route::get('getInvoiceById/{invoice_id}', [InvoiceController::class, 'getInvoiceById']);
Route::get('overallSales', [SalesController::class, 'overallSales']);

Route::post('/pay', [WalletController::class, 'pay']);
Route::post('/receive', [WalletController::class, 'receive']);
Route::get('/balance', [WalletController::class, 'getBalance']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', [AuthController::class, 'user']);
Route::get('/logout', [AuthController::class, 'logout']);